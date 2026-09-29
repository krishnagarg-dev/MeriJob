const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.userId,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .populate("companyRef")
      .sort({ createdAt: -1 });

    const formattedApplications = applications.map((application) => {
      const item = application.toObject();

      return {
        ...item,
        companyName:
          item.companyName ||
          item.companyRef?.name ||
          item.job?.company?.name ||
          "",
        location: item.location || item.job?.location || "",
        jobTitle: item.jobTitle || item.job?.title || "",
      };
    });

    res.json({
      success: true,
      count: formattedApplications.length,
      applications: formattedApplications,
    });
  } catch (error) {
    console.error("Fetch applications error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};