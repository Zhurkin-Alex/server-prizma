"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templatesRouter = void 0;
const express_1 = require("express");
const templates_service_1 = require("./templates.service");
const router = (0, express_1.Router)();
const templateService = new templates_service_1.TemplateService();
router.post('/create', async (req, res) => {
    try {
        const template = await templateService.createTemplate(req.body);
        console.log('updatedSite', req.body);
        res.status(201).json(template);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the template." });
    }
});
router.post('/create-multiple', async (req, res) => {
    console.warn('create-multiple-----');
    try {
        const templates = await templateService.createTemplates(req.body);
        res.status(201).json(templates);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the templates." });
    }
});
router.get('/templates', async (req, res) => {
    try {
        const templates = await templateService.getAllTemplates();
        res.status(200).json(templates);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while retrieving the templates." });
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID provided." });
            return;
        }
        await templateService.deleteTemplateById(id);
        res.status(200).json({ message: `Site with ID ${id} was deleted successfully.` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the templates." });
    }
});
router.put('/update/:id', async (req, res) => {
    console.warn('update', req.body);
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID provided." });
            return;
        }
        const updatedSite = await templateService.updateTemplateById(id, req.body);
        res.status(200).json(updatedSite);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the templates." });
    }
});
exports.templatesRouter = router;
