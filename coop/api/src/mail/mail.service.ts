import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

export type WelcomeMailContext = {
  email: string;
  postalCode: string;
  commune?: string | null;
};

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend | null;

  constructor(private readonly config: ConfigService) {
    const key = this.config.get<string>('RESEND_API_KEY')?.trim();
    this.resend = key ? new Resend(key) : null;
  }

  async sendRegistrationConfirmation(ctx: WelcomeMailContext) {
    const from =
      this.config.get<string>('EMAIL_FROM') ??
      'Pi COOP <onboarding@resend.dev>';
    const appUrl = (
      this.config.get<string>('APP_PUBLIC_URL') ?? 'http://localhost:3000'
    ).replace(/\/$/, '');
    const subject = 'Pré-inscription confirmée — bienvenue chez Pi COOP';

    const placeLabel = ctx.commune
      ? `${ctx.commune} (${ctx.postalCode})`
      : `votre code postal ${ctx.postalCode}`;

    const text = [
      'Bonjour,',
      '',
      'Félicitations — votre pré-inscription à Pi COOP est confirmée.',
      '',
      'Vous venez de réserver votre place dans un supermarché citoyen : courses de qualité, du grossiste à votre assiette, avec seulement 20 centimes de marge fixe (prix cibles estimés, non contractuels).',
      '',
      `Où en est ${placeLabel} ?`,
      'Pour ouvrir le magasin, la jauge doit atteindre 5 000 préinscrits. C’est la force du nombre qui porte le projet.',
      '',
      'Et maintenant ?',
      '• Votre place est réservée — la préinscription reste 100 % gratuite.',
      '• Faites monter la jauge : parlez-en à vos voisins, votre famille, vos amis.',
      '• Le Jour J : dès que votre ville atteint l’objectif, vous serez alerté·e pour activer votre compte (cotisation solidaire de 10 € / personne / mois, enfants inclus) et préparer l’ouverture.',
      '',
      `Partagez le lien pour accélérer le compteur : ${appUrl}`,
      '',
      'Merci de faire partie des pionniers.',
      'Ensemble, on change les règles de la grande distribution.',
      '',
      'À très vite,',
      'Les membres fondateurs de Pi COOP',
    ].join('\n');

    const html = `
      <div style="font-family:Georgia,serif;line-height:1.55;color:#12261f;max-width:560px;margin:0 auto">
        <p style="font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:#1f6f54;margin:0 0 8px">Pi COOP</p>
        <h1 style="font-size:22px;line-height:1.25;margin:0 0 16px">Pré-inscription confirmée</h1>
        <p>Bonjour,</p>
        <p><strong>Félicitations</strong> — votre pré-inscription à Pi COOP est confirmée.</p>
        <p>Vous venez de réserver votre place dans un supermarché citoyen : courses de qualité, du grossiste à votre assiette, avec seulement <strong>20 centimes</strong> de marge fixe. <em style="color:#5b6b63">(Prix cibles estimés, non contractuels.)</em></p>
        <h2 style="font-size:17px;margin:28px 0 8px">Où en est ${escapeHtml(placeLabel)}&nbsp;?</h2>
        <p>Pour ouvrir le magasin, la jauge doit atteindre <strong>5&nbsp;000 préinscrits</strong>. C’est la force du nombre qui porte le projet.</p>
        <h2 style="font-size:17px;margin:28px 0 8px">Et maintenant&nbsp;?</h2>
        <ul>
          <li>Votre place est réservée — la préinscription reste <strong>100&nbsp;% gratuite</strong>.</li>
          <li><strong>Faites monter la jauge</strong> : voisins, famille, amis.</li>
          <li><strong>Le Jour J</strong> : dès l’objectif atteint, alerte pour activer votre compte (cotisation solidaire de <strong>10&nbsp;€ / personne / mois</strong>, enfants inclus) et préparer l’ouverture.</li>
        </ul>
        <p style="margin:28px 0">
          <a href="${appUrl}" style="display:inline-block;background:#1f6f54;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600">
            Suivre la jauge &amp; partager
          </a>
        </p>
        <p>Merci de faire partie des pionniers.<br/>Ensemble, on change les règles de la grande distribution.</p>
        <p style="margin-top:28px">À très vite,<br/><strong>Les membres fondateurs de Pi COOP</strong></p>
      </div>
    `;

    if (!this.resend) {
      this.logger.log(`[mail:dev] to=${ctx.email} from=${from} subject=${subject}`);
      this.logger.debug(text);
      return;
    }

    const { error } = await this.resend.emails.send({
      from,
      to: ctx.email,
      subject,
      text,
      html,
    });

    if (error) {
      this.logger.error(`Resend failed: ${JSON.stringify(error)}`);
      // Don't fail registration if email provider blips — account already created
      return;
    }

    this.logger.log(`[mail:resend] sent to=${ctx.email}`);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
