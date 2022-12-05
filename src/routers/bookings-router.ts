import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookings, postBooking, changeBooking } from "@/controllers";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBookings)
  .post("/", postBooking)
  .put("/:bookingId", changeBooking);

export { bookingsRouter };
