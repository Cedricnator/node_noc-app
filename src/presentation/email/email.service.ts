import { envs } from '../../config/plugins/envs.plugin';
import nodemailer from 'nodemailer';

interface SendMailOptions {
    attachements?: Attachement[];
    htmlBody: string;
    subject:  string;
    to: string | string[];
}

interface Attachement {
    filename: string;
    path:     string;
}

export class EmailService{
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_PASSWORD
        }
    });

    constructor(){}

    async sendEmail(options: SendMailOptions ): Promise<boolean>{
        const { to, subject, htmlBody, attachements = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });

            return true;
        
        } catch (error) {
        
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ){
        const subject = 'Logs del servidor'
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Lorem vilit non veniam</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachements: Attachement[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-heigh.log', path: './logs/logs-hight.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            to, subject, attachements, htmlBody
        })
    }
}