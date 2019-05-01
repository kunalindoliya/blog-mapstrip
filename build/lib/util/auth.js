"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    next();
};
exports.default = auth;
