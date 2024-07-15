"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeErrors = exports.badgeNameErrors = exports.userErrors = exports.imageErrors = exports.profilePictureErrors = exports.iconErrors = exports.passConfirmErrors = exports.passwordErrors = exports.emailErrors = exports.nameErrors = exports.throwError = void 0;
const graphql_1 = require("graphql");
const user_1 = __importDefault(require("../../models/user"));
const badge_1 = __importDefault(require("../../models/badge"));
const throwError = (type, value, message, code) => {
    throw new graphql_1.GraphQLError(JSON.stringify({
        type: type.toLowerCase(),
        value,
        message,
        code: code ? code : 400,
    }));
};
exports.throwError = throwError;
const nameErrors = (name, user) => __awaiter(void 0, void 0, void 0, function* () {
    const type = "name";
    if (!name) {
        (0, exports.throwError)(type, name, "Please enter a name.");
    }
    if (!/^[a-zA-Z\s-']{1,30}$/.test(name)) {
        if (name.length > 30) {
            (0, exports.throwError)(type, name, "30 characters maximum.");
        }
        (0, exports.throwError)(type, name, "No numbers or special characters.");
    }
    if (user && name === user.name) {
        (0, exports.throwError)(type, name, "This is already your username.");
    }
    const dbUser = yield user_1.default.findOne({ name });
    if (dbUser) {
        (0, exports.throwError)(type, name, "This username is taken.");
    }
});
exports.nameErrors = nameErrors;
const emailErrors = (email, user) => __awaiter(void 0, void 0, void 0, function* () {
    const type = "email";
    if (!email) {
        (0, exports.throwError)(type, email, "Please enter an email.");
    }
    if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
        (0, exports.throwError)(type, email, "Please enter a valid email address.");
    }
    if (user) {
        if (email === user.email) {
            (0, exports.throwError)(type, email, "This is already your email address.");
        }
    }
    if (yield user_1.default.findOne({ email })) {
        (0, exports.throwError)(type, email, "A user by that email already exists!");
    }
});
exports.emailErrors = emailErrors;
const passwordErrors = (password, passConfirm) => {
    const type = "password";
    if (!password) {
        (0, exports.throwError)(type, password, "Please enter a password.");
    }
    else {
        if (password.length <= 8) {
            (0, exports.throwError)(type, password, "Minimum 8 characters.");
        }
        if (password.length >= 40) {
            (0, exports.throwError)(type, password, "Maximum 40 characters.");
        }
        if (!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d!?_<>"'$£%^&(){};:+=*#]{8,40}$/.test(password)) {
            (0, exports.throwError)(type, password, "At least one letter and one number.");
        }
        if (password !== passConfirm) {
            (0, exports.throwError)(type, password, "Passwords do not match.");
        }
    }
};
exports.passwordErrors = passwordErrors;
const passConfirmErrors = (passConfirm, password) => {
    const type = "passConfirm";
    if (!passConfirm) {
        (0, exports.throwError)(type, password, "Please enter your password confirmation.");
    }
    if (passConfirm !== password) {
        (0, exports.throwError)(type, password, "Passwords do not match.");
    }
};
exports.passConfirmErrors = passConfirmErrors;
const iconErrors = (icon, profile_picture, user) => {
    const type = "icon";
    if (icon) {
        if (!/^http:\/\/[a-z0-9-.]+\/[a-z0-9-]+\/icon\/[a-z0-9-]+$/i.test(icon)) {
            (0, exports.throwError)(type, icon, "Icon URL is not valid... Tricky one.");
        }
    }
    if (icon && !profile_picture) {
        (0, exports.throwError)(type, icon, "Got Icon but no Profile Picture?!");
    }
    if (icon && user) {
        if (icon === user.icon) {
            (0, exports.throwError)(type, icon, "Duplicate Icon.");
        }
    }
};
exports.iconErrors = iconErrors;
const profilePictureErrors = (profile_picture, icon, user) => {
    const type = "profile_picture";
    if (profile_picture) {
        if (!/^http:\/\/[a-z0-9-.]+\/[a-z0-9-]+\/profile-picture\/[a-z0-9-]+$/i.test(profile_picture)) {
            (0, exports.throwError)(type, profile_picture, "Profile Picture URL is not valid... Tricky one.");
        }
    }
    if (profile_picture && !icon) {
        (0, exports.throwError)(type, icon, "Got Profile Picture but no Icon?!");
    }
    if (profile_picture && user) {
        if (profile_picture === user.profile_picture) {
            (0, exports.throwError)(type, profile_picture, "Duplicate Profile Picture.");
        }
    }
};
exports.profilePictureErrors = profilePictureErrors;
const imageErrors = (type, value) => {
    if (!/^[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/i.test(value)) {
        (0, exports.throwError)(type, value, "Image file name is not valid.");
    }
};
exports.imageErrors = imageErrors;
const userErrors = (user) => {
    const type = "email";
    if (!user) {
        (0, exports.throwError)(type, user, "Account not found!");
    }
};
exports.userErrors = userErrors;
const badgeNameErrors = (badgeName) => {
    const type = "badgeName";
    if (!badgeName) {
        (0, exports.throwError)(type, badgeName, "Please enter a name.");
    }
    if (!/^[a-zA-Z\s-']{1,15}$/.test(badgeName)) {
        if (badgeName.length > 15) {
            (0, exports.throwError)(type, badgeName, "15 characters maximum.");
        }
        (0, exports.throwError)(type, badgeName, "No numbers or special characters.");
    }
};
exports.badgeNameErrors = badgeNameErrors;
const badgeErrors = (badge) => __awaiter(void 0, void 0, void 0, function* () {
    const type = "badge";
    if (!badge.championship) {
        (0, exports.throwError)(type, badge, "You must pass a championship.");
    }
    if (!badge.url) {
        (0, exports.throwError)(type, badge, "You must pass an image URL.");
    }
    if (!badge.name) {
        (0, exports.throwError)(type, badge, "Please enter a name.");
    }
    if (!badge.awardedHow) {
        (0, exports.throwError)(type, badge, "Please enter how this badge should be earned.");
    }
    if (!badge.awardedDesc) {
        (0, exports.throwError)(type, badge, "Please describe how this badge should be earned.");
    }
    if (!badge.rarity) {
        (0, exports.throwError)(type, badge, "Please enter a rarity for the badge.");
    }
    const badges = yield badge_1.default.find({ championship: badge.championship }).exec();
    console.log(badges);
});
exports.badgeErrors = badgeErrors;
//# sourceMappingURL=resolverErrors.js.map