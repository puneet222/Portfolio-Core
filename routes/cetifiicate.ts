import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { ICertificate } from "../models/Certificate";

const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const auth = require('../middleware/auth');

// @route       GET api/certificate
// @desc        Get Certificates
// @access      public

router.get('/', async (req: Request, res: any) => {
    try {
        const certificates: any = await Certificate.find({});
        res.json(certificates);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/certificate
// @desc        Create Certificate
// @access      private

router.post('/', auth, async (req: any, res: any) => {
    try {
        const {
            name,
            link,
            imageLink,
            source,
            issueDate,
            validTill
        } = <any>req.body;

        const certificate: ICertificate = new Certificate({
            name,
            link,
            imageLink,
            source,
            issueDate,
            validTill
        });
        await certificate.save();
        res.json(certificate);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       PUT api/certificate
// @desc        UPDATE Certificate
// @access      private

router.put('/', auth, async (req: Request, res: any) => {
    try {
        const {
            name,
            link,
            imageLink,
            source,
            issueDate,
            validTill,
            _id
        } = <any>req.body;

        const newData = {
            name,
            link,
            imageLink,
            source,
            issueDate,
            validTill
        }
        await Certificate.findOneAndUpdate({ _id }, newData, { upsert: true });
        res.json({ msg: UPDATE_SUCCESS });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       DELETE api/certificate
// @desc        Delete Certificate
// @access      private

router.delete('/', auth, async (req: any, res: any) => {
    try {
        const { _id } = req.body;
        await Certificate.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

module.exports = router;