import express, { Router, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import Certificate, { ICertificate } from "../models/Certificate";
import AuthMiddleware from "../middleware/auth";

export const certificateRouter: Router = express.Router();


// @route       GET api/certificate
// @desc        Get Certificates
// @access      public

certificateRouter.get('/', async (req: Request, res: Response) => {
    try {
        const certificates: Array<ICertificate> = await Certificate.find({});
        res.json(certificates);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/certificate
// @desc        Create Certificate
// @access      private

certificateRouter.post('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const {
            name,
            link,
            imageLink,
            source,
            issueDate,
            validTill
        } = req.body;

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

certificateRouter.put('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const {
            name,
            link,
            imageLink,
            source,
            issueDate,
            validTill,
            _id
        } = req.body;

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

certificateRouter.delete('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        await Certificate.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
