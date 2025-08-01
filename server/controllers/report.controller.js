import { Report } from "../models/reports.model.js";

export const createReport = async (req, res) => {
  const { reporterId, carId, reportedUserId, reason, reportDescription } =
    req.body;

  if (!reporterId || !reportedUserId || !reason || !reportDescription) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {
    const report = await Report.create({
      reporterId,
      carId,
      reportedUserId,
      reportReason: reason,
      reportDescription,
    });

    return res
      .status(200)
      .json({ message: "Report submit successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getreport = async (req, res) => {
  const isAdmin = req.isAdmin;
  if (!isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  try {
    const reports = await Report.find();
    return res.status(200).json({ reports, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
