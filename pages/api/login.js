import { applySession, withIronSession } from "next-iron-session";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).send("");

  const { email, password, rememberMe } = req.body;
  const res_validation_json = await fetch(
    `${process.env.APIHOST}/login`,
    {
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
    }
  );

  const res_validation = await res_validation_json.json();

  if (!res_validation.result) {
    return res.status(200).json({
      result: false,
      message: res_validation.message
    });
  }

  const configCookie = process.env.CONFIGCOOKIE;
  configCookie.cookieOptions.maxAge = rememberMe ? 109500 : 2400;
  await applySession(req, res, configCookie);
  
  req.session.set("user", res_validation.user);
  await req.session.save();

  return res.status(201).json({ result: true });
}