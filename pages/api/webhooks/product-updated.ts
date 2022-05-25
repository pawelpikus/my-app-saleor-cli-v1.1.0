import { NextApiHandler } from "next";
import { webhookMiddleware } from "../../../lib/middlewares";
import MiddlewareError from "../../../utils/MiddlewareError";

const expectedEvent = "product_updated";

const handler: NextApiHandler = (req, res) => {
  console.log(req.body);

  try {
    webhookMiddleware(req, expectedEvent);
  } catch (e: unknown) {
    const error = e as MiddlewareError;

    console.error(error);
    res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
    return;
  }

  console.info("Middleware checks were successful!");

  res.json({ success: true });
};

export default handler;
