"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteRouter = void 0;
const express_1 = require("express");
const site_service_1 = require("./site.service");
const router = (0, express_1.Router)();
const siteService = new site_service_1.SiteService();
router.post('/create', async (req, res) => {
    try {
        const site = await siteService.createSite(req.body);
        console.log('updatedSite', req.body);
        res.status(201).json(site);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the site." });
    }
});
router.post('/create-multiple', async (req, res) => {
    try {
        const sites = await siteService.createSites(req.body);
        res.status(201).json(sites);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the sites." });
    }
});
router.get('/sites', async (req, res) => {
    try {
        const sites = await siteService.getAllSites();
        res.status(200).json(sites);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while retrieving the sites." });
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID provided." });
            return;
        }
        await siteService.deleteSiteById(id);
        res.status(200).json({ message: `Site with ID ${id} was deleted successfully.` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the site." });
    }
});
router.put('/update/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID provided." });
            return;
        }
        const updatedSite = await siteService.updateSiteById(id, req.body);
        res.status(200).json(updatedSite);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the site." });
    }
});
exports.siteRouter = router;
