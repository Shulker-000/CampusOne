import { Responsibility } from "../models/responsibility.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createResponsibility = asyncHandler(async (req, res) => {
    const { institutionId, name, code, category, description } = req.body;

    if (!institutionId || !name || !code || !category) {
        throw new ApiError("All required fields must be provided", 400);
    }

    const allowedCategories = ["Academic", "Administrative", "Hostel", "Estate"];

    if (!allowedCategories.includes(category)) {
        throw new ApiError(`Invalid category. Must be one of: ${allowedCategories.join(", ")}`, 400);
    }

    if (!mongoose.isValidObjectId(institutionId)) {
        throw new ApiError("Invalid institutionId", 400);
    }

    const existing = await Responsibility.findOne({
        institutionId,
        code: code.toUpperCase(),
    });

    if (existing) {
        throw new ApiError("Responsibility with this code already exists", 409);
    }

    const responsibility = await Responsibility.create({
        institutionId,
        name,
        code,
        category,
        description,
    });

    res.status(201).json(
        new ApiResponse("Responsibility created successfully", responsibility)
    );
});

const getResponsibilitiesByInstitution = asyncHandler(async (req, res) => {
    const { institutionId } = req.params;

    if (!mongoose.isValidObjectId(institutionId)) {
        throw new ApiError("Invalid institutionId", 400);
    }

    const responsibilities = await Responsibility.find({
        institutionId,
        isActive: true,
    });

    res.status(200).json(
        new ApiResponse("Responsibilities fetched successfully", responsibilities)
    );
});

const getResponsibilityById = asyncHandler(async (req, res) => {
    const { responsibilityId } = req.params;

    if (!mongoose.isValidObjectId(responsibilityId)) {
        throw new ApiError("Invalid responsibilityId", 400);
    }

    const responsibility = await Responsibility.findById(responsibilityId);

    if (!responsibility) {
        throw new ApiError("Responsibility not found", 404);
    }

    res.status(200).json(
        new ApiResponse("Responsibility fetched successfully", responsibility)
    );
});

const updateResponsibility = asyncHandler(async (req, res) => {
    const { responsibilityId } = req.params;
    const { name, code, category, description, isActive } = req.body;

    if (!mongoose.isValidObjectId(responsibilityId)) {
        throw new ApiError("Invalid responsibilityId", 400);
    }

    const allowedCategories = ["Academic", "Administrative", "Hostel", "Estate"];

    if (!allowedCategories.includes(category)) {
        throw new ApiError(`Invalid category. Must be one of: ${allowedCategories.join(", ")}`, 400);
    }

    const responsibility = await Responsibility.findById(responsibilityId);

    if (!responsibility) {
        throw new ApiError("Responsibility not found", 404);
    }

    if (code && code.toUpperCase() !== responsibility.code) {
        const duplicate = await Responsibility.findOne({
            institutionId: responsibility.institutionId,
            code: code.toUpperCase(),
            _id: { $ne: responsibilityId },
        });

        if (duplicate) {
            throw new ApiError("Another responsibility with this code already exists", 409);
        }
        responsibility.code = code;
    }

    if (name) responsibility.name = name;
    if (category) responsibility.category = category;
    if (description !== undefined) responsibility.description = description;
    if (isActive !== undefined) responsibility.isActive = isActive;

    await responsibility.save();

    res.status(200).json(
        new ApiResponse("Responsibility updated successfully", responsibility)
    );
});


const changeActiveStatus = asyncHandler(async (req, res) => {
    const { responsibilityId } = req.params;
    const { activeStatus } = req.body;

    if (!mongoose.isValidObjectId(responsibilityId)) {
        throw new ApiError("Invalid responsibilityId", 400);
    }
    if (!activeStatus)
        throw new ApiError("Active Status not provided", 400);

    const responsibility = await Responsibility.findById(responsibilityId);

    if (!responsibility) {
        throw new ApiError("Responsibility not found", 404);
    }

    responsibility.isActive = activeStatus;
    await responsibility.save();

    res.status(200).json(
        new ApiResponse("Responsibility inactivated successfully")
    );
});

const deleteResponsibility = asyncHandler(async (req, res) => {
    const { responsibilityId } = req.params;

    if (!mongoose.isValidObjectId(responsibilityId)) {
        throw new ApiError("Invalid responsibilityId", 400);
    }

    const responsibility = await Responsibility.findById(responsibilityId);

    if (!responsibility) {
        throw new ApiError("Responsibility not found", 404);
    }
    await Responsibility.findByIdAndDelete(responsibilityId);
    res.status(200).json(
        new ApiResponse("Responsibility inactivated successfully")
    )
})

export {
    createResponsibility,
    getResponsibilitiesByInstitution,
    updateResponsibility,
    getResponsibilityById,
    changeActiveStatus,
    deleteResponsibility
}