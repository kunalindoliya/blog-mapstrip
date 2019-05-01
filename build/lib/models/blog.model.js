"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const category_model_1 = require("./category.model");
const tag_model_1 = require("./tag.model");
const blog_tag_model_1 = require("./blog-tag.model");
let Blog = class Blog extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Blog.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Blog.prototype, "category_name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Blog.prototype, "stub", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Blog.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Blog.prototype, "coverImage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Blog.prototype, "thumbnailImage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Blog.prototype, "externalResource", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Blog.prototype, "externalResourceType", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Blog.prototype, "tags_name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Blog.prototype, "shortDescription", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Blog.prototype, "data", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => user_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Blog.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Blog.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => category_model_1.Category),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Blog.prototype, "categoryId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => category_model_1.Category),
    __metadata("design:type", category_model_1.Category)
], Blog.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => tag_model_1.Tag, () => blog_tag_model_1.BlogTag),
    __metadata("design:type", Array)
], Blog.prototype, "tags", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Object)
], Blog.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Object)
], Blog.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    __metadata("design:type", Object)
], Blog.prototype, "deletedAt", void 0);
Blog = __decorate([
    sequelize_typescript_1.Table
], Blog);
exports.Blog = Blog;
