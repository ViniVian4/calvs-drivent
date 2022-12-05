import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookings, postBooking } from "@/controllers";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBookings)
  .post("/", postBooking);

export { bookingsRouter };
