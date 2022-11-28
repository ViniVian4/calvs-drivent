import { ApplicationError } from "@/protocols";

export function needPaymentError(): ApplicationError {
  return {
    name: "needPaymentError",
    message: "This ticket needs payment",
  };
}
