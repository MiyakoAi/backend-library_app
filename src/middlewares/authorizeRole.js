// export function authorizeRole(...allowedRoles) {
//   return (req, res, next) => {
//     if (!req.user || !allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Akses ditolak: Tidak memiliki hak' });
//     }
//     next();
//   };
// }

export const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Akses ditolak: Tidak memiliki hak" });
  }
  next();
};