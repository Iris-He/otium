import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Favorite techniques functions
export const saveFavoriteTechnique = async (
  userId,
  techniqueId,
  techniqueName
) => {
  if (!userId || !techniqueId || !techniqueName) {
    throw new Error("Missing required parameters");
  }

  const { data, error } = await supabase
    .from("favorite_techniques")
    .insert([
      {
        user_id: userId,
        technique_id: techniqueId,
        technique_name: techniqueName,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const checkFavoriteTechnique = async (userId, techniqueId) => {
  if (!userId || !techniqueId) {
    return false;
  }

  const { data, error } = await supabase
    .from("favorite_techniques")
    .select()
    .eq("user_id", userId)
    .eq("technique_id", techniqueId);

  if (error) {
    console.error("Error checking favorite technique:", error);
    return false;
  }

  return data && data.length > 0;
};

export const getFavoriteTechniques = async (userId) => {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("favorite_techniques")
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching favorite techniques:", error);
    return [];
  }

  return data;
};

// Technique usage and insights functions
export const saveTechniqueUsage = async ({
  userId,
  techniqueId,
  techniqueName,
  rating,
  anxietyLevel,
  anxietyContext,
}) => {
  if (!userId || !techniqueId || !techniqueName) {
    throw new Error("Missing required parameters");
  }

  const now = new Date();
  const dayOfWeek = now.getDay(); // 0-6 (Sunday-Saturday)
  const timeOfDay = now.getHours(); // 0-23

  const { data, error } = await supabase
    .from("technique_usage")
    .insert([
      {
        user_id: userId,
        technique_id: techniqueId,
        technique_name: techniqueName,
        rating: rating || null,
        anxiety_level: anxietyLevel || null,
        anxiety_context: anxietyContext || null,
        day_of_week: dayOfWeek,
        time_of_day: timeOfDay,
        created_at: now.toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error("Error saving technique usage:", error);
    throw error;
  }

  return data;
};

export const getUserInsights = async (userId, timeRange = "all") => {
  if (!userId) {
    return null;
  }

  // Build query based on time range
  let query = supabase.from("technique_usage").select().eq("user_id", userId);

  // Filter by date range if needed
  if (timeRange === "recent") {
    // Get data from the last 14 days
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    query = query.gte("created_at", twoWeeksAgo.toISOString());
  }

  // Execute the query
  const { data: usageData, error: usageError } = await query.order(
    "created_at",
    { ascending: false }
  );

  if (usageError) {
    console.error("Error fetching technique usage data:", usageError);
    return null;
  }

  // If no data is found
  if (!usageData || usageData.length === 0) {
    return {
      totalTechniquesUsed: 0,
      uniqueTechniques: 0,
      averageRating: 0,
      topRatedTechnique: null,
      lowestRatedTechnique: null,
      mostUsedTechnique: null,
      dayOfWeekDistribution: [],
      timeOfDayDistribution: [],
      recentUsage: [],
      usageByTechnique: [],
      timeRange,
    };
  }

  // Calculate insights
  const insights = {
    totalTechniquesUsed: usageData.length,
    uniqueTechniques: [...new Set(usageData.map((item) => item.technique_id))]
      .length,
    averageRating: calculateAverageRating(usageData),
    topRatedTechnique: findTopRatedTechnique(usageData),
    lowestRatedTechnique: findLowestRatedTechnique(usageData),
    mostUsedTechnique: findMostUsedTechnique(usageData),
    dayOfWeekDistribution: calculateDayOfWeekDistribution(usageData),
    timeOfDayDistribution: calculateTimeOfDayDistribution(usageData),
    recentUsage: usageData.slice(0, 5), // Last 5 techniques used
    usageByTechnique: calculateUsageByTechnique(usageData),
    timeRange,
  };

  return insights;
};

// Helper functions for insights calculations
function calculateAverageRating(usageData) {
  const ratingsData = usageData.filter((item) => item.rating !== null);
  if (ratingsData.length === 0) return 0;

  const sum = ratingsData.reduce((acc, item) => acc + item.rating, 0);
  return (sum / ratingsData.length).toFixed(1);
}

function findTopRatedTechnique(usageData) {
  const ratingsData = usageData.filter((item) => item.rating !== null);
  if (ratingsData.length === 0) return null;

  // Group by technique and calculate average rating
  const techniqueRatings = {};
  const techniqueCounts = {};

  ratingsData.forEach((item) => {
    if (!techniqueRatings[item.technique_id]) {
      techniqueRatings[item.technique_id] = 0;
      techniqueCounts[item.technique_id] = 0;
    }
    techniqueRatings[item.technique_id] += item.rating;
    techniqueCounts[item.technique_id]++;
  });

  // Calculate average for each technique
  const averageRatings = Object.keys(techniqueRatings).map((id) => ({
    techniqueId: parseInt(id),
    techniqueName: ratingsData.find(
      (item) => item.technique_id === parseInt(id)
    ).technique_name,
    averageRating: techniqueRatings[id] / techniqueCounts[id],
  }));

  // Find the highest rated
  return (
    averageRatings.sort((a, b) => b.averageRating - a.averageRating)[0] || null
  );
}

function findLowestRatedTechnique(usageData) {
  const ratingsData = usageData.filter((item) => item.rating !== null);
  if (ratingsData.length === 0) return null;

  // Group by technique and calculate average rating
  const techniqueRatings = {};
  const techniqueCounts = {};

  ratingsData.forEach((item) => {
    if (!techniqueRatings[item.technique_id]) {
      techniqueRatings[item.technique_id] = 0;
      techniqueCounts[item.technique_id] = 0;
    }
    techniqueRatings[item.technique_id] += item.rating;
    techniqueCounts[item.technique_id]++;
  });

  // Calculate average for each technique
  const averageRatings = Object.keys(techniqueRatings).map((id) => ({
    techniqueId: parseInt(id),
    techniqueName: ratingsData.find(
      (item) => item.technique_id === parseInt(id)
    ).technique_name,
    averageRating: techniqueRatings[id] / techniqueCounts[id],
  }));

  // Find the lowest rated
  return (
    averageRatings.sort((a, b) => a.averageRating - b.averageRating)[0] || null
  );
}

function findMostUsedTechnique(usageData) {
  if (usageData.length === 0) return null;

  // Count occurrences of each technique
  const techniqueCounts = {};

  usageData.forEach((item) => {
    if (!techniqueCounts[item.technique_id]) {
      techniqueCounts[item.technique_id] = 0;
    }
    techniqueCounts[item.technique_id]++;
  });

  // Find the most used technique
  const mostUsedId = Object.keys(techniqueCounts).reduce((a, b) =>
    techniqueCounts[a] > techniqueCounts[b] ? a : b
  );

  return {
    techniqueId: parseInt(mostUsedId),
    techniqueName: usageData.find(
      (item) => item.technique_id === parseInt(mostUsedId)
    ).technique_name,
    count: techniqueCounts[mostUsedId],
  };
}

function calculateDayOfWeekDistribution(usageData) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const distribution = Array(7).fill(0);

  usageData.forEach((item) => {
    if (
      item.day_of_week !== null &&
      item.day_of_week >= 0 &&
      item.day_of_week <= 6
    ) {
      distribution[item.day_of_week]++;
    }
  });

  return days.map((day, index) => ({
    day,
    count: distribution[index],
  }));
}

function calculateTimeOfDayDistribution(usageData) {
  // Group into morning (5-11), afternoon (12-17), evening (18-21), night (22-4)
  const timeGroups = [
    { name: "Morning", count: 0 },
    { name: "Afternoon", count: 0 },
    { name: "Evening", count: 0 },
    { name: "Night", count: 0 },
  ];

  usageData.forEach((item) => {
    const hour = item.time_of_day;
    if (hour >= 5 && hour <= 11) {
      timeGroups[0].count++;
    } else if (hour >= 12 && hour <= 17) {
      timeGroups[1].count++;
    } else if (hour >= 18 && hour <= 21) {
      timeGroups[2].count++;
    } else {
      timeGroups[3].count++;
    }
  });

  return timeGroups;
}

function calculateUsageByTechnique(usageData) {
  const techniqueMap = {};

  usageData.forEach((item) => {
    if (!techniqueMap[item.technique_id]) {
      techniqueMap[item.technique_id] = {
        techniqueId: item.technique_id,
        techniqueName: item.technique_name,
        count: 0,
        totalRating: 0,
        ratingCount: 0,
      };
    }

    techniqueMap[item.technique_id].count++;

    if (item.rating !== null) {
      techniqueMap[item.technique_id].totalRating += item.rating;
      techniqueMap[item.technique_id].ratingCount++;
    }
  });

  // Convert to array and calculate average ratings
  return Object.values(techniqueMap).map((technique) => ({
    ...technique,
    averageRating:
      technique.ratingCount > 0
        ? (technique.totalRating / technique.ratingCount).toFixed(1)
        : null,
  }));
}

export default supabase;
