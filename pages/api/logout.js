import { withIronSession } from "next-iron-session";

export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      req.session.destroy();
      return res.status(201).json({ "result": "true" });
    }

    return res.status(404).send("");
  },
  process.env.CONFIGCOOKIE
);
