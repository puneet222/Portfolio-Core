import express, { Router, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { ICertificate } from "../models/Certificate";
import AuthMiddleware from "../middleware/auth";
import { CertificateType, AuthRequest } from './routes.interface';
import CertificateService from '../services/certificateService';

export const certificateRouter: Router = express.Router();


// @route       GET api/certificate
// @desc        Get Certificates
// @access      private

certificateRouter.get('/', AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        let userId: string = req.user?.id ? req.user?.id : '';
        let certificates: Array<ICertificate> = await CertificateService.getAllCertificates(userId);
        return res.send(certificates);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/certificate
// @desc        Create Certificate
// @access      private

certificateRouter.post('/', AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const certificateData: CertificateType = req.body;
        certificateData.user = req.user?.id;
        const certificate: ICertificate = await CertificateService.createCertificate(certificateData);
        return res.json(certificate);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       PUT api/certificate
// @desc        UPDATE Certificate
// @access      private

certificateRouter.put('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const newData: CertificateType = req.body;
        await CertificateService.updateCertificate(newData);
        return res.json({ msg: UPDATE_SUCCESS });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       DELETE api/certificate
// @desc        Delete Certificate
// @access      private

certificateRouter.delete('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        await CertificateService.deleteCertificate(_id);
        return res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
