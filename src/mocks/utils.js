export const path = (api) => (path) => api + path;

export const getToken = (req) =>
   req.headers.get("authorization").split(" ").pop();

export const resp = (res, ctx, data, status = 200) =>
   res(ctx.delay(600), ctx.json(data), ctx.status(status));
