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
    // Deliverability: avoid emoji-heavy subjects (spam filters)
    const subject = 'Bienvenue chez Pi COOP — voici notre plan';

    const placeLabel = ctx.commune
      ? `${ctx.commune} (${ctx.postalCode})`
      : `votre code postal ${ctx.postalCode}`;

    const text = [
      'Bonjour,',
      '',
      'Votre pré-inscription à Pi COOP est confirmée. Bienvenue du bon côté de la distribution.',
      '',
      'Si vous nous avez rejoints via un lien (WhatsApp, Facebook, Instagram…), vous vous demandez peut-être : comment vendre du bio de qualité à un prix aussi bas ?',
      '',
      'La réponse est simple : nous réduisons les intermédiaires. Pi COOP n’est pas un supermarché classique — c’est votre coopérative.',
      '',
      'Les 3 piliers :',
      '',
      '1. Zéro profit sur la nourriture',
      'Nous achetons au prix grossiste. Vous payez ce prix coûtant, plus 20 centimes fixes par article pour l’énergie, le loyer et le fonctionnement. (Prix cibles estimés, non contractuels.)',
      '',
      '2. Le bénévolat (notre force)',
      'Chaque adulte actif consacre 2 heures par mois (caisse, rayons…). Moins de masse salariale = des prix plus bas pour tout le monde. Les plus jeunes et les seniors sont exemptés.',
      '',
      '3. Le trésor commun',
      'Une fois le magasin ouvert : 10 € / mois / personne (enfants inclus). Ce n’est pas une « dépense gaspillée » : c’est le fonds collectif qui permet d’acheter en volume, sans dépendre du crédit bancaire classique.',
      '',
      `Objectif pour ${placeLabel} : 10 000 personnes (chaque membre du foyer compte).`,
      'C’est le point de bascule pour ouvrir — pas la ligne d’arrivée. Au-delà, on continue pour renforcer le pouvoir de négociation.',
      'La première ville à franchir 10 000 accueille le magasin historique ; les suivantes suivent sur une roadmap d’ouverture.',
      'Aujourd’hui, vous ne payez rien. Votre mission : faire grandir le réseau — surtout localement.',
      '',
      `Partagez ce lien à 3 personnes de votre entourage : ${appUrl}`,
      '',
      'L’inflation n’est pas une fatalité. Reprenons le pouvoir d’achat, ensemble.',
      '',
      'À très vite,',
      'L’équipe fondatrice de Pi COOP',
    ].join('\n');

    const html = `
      <div style="font-family:Georgia,'Times New Roman',serif;line-height:1.55;color:#12261f;max-width:560px;margin:0 auto;padding:8px">
        <p style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#1f6f54;margin:0 0 10px">Pi COOP</p>
        <h1 style="font-size:22px;line-height:1.3;margin:0 0 18px;font-weight:600">Bienvenue — voici notre plan</h1>
        <p>Bonjour,</p>
        <p>Votre pré-inscription à <strong>Pi COOP</strong> est confirmée. Bienvenue du bon côté de la distribution.</p>
        <p>Si vous nous avez rejoints via un lien (WhatsApp, Facebook, Instagram…), vous vous demandez peut-être : <em>comment vendre du bio de qualité à un prix aussi bas&nbsp;?</em></p>
        <p>La réponse est simple : nous réduisons les intermédiaires. Pi COOP n’est pas un supermarché classique — <strong>c’est votre coopérative</strong>.</p>

        <h2 style="font-size:17px;margin:28px 0 12px">Les 3 piliers</h2>

        <p style="margin:0 0 6px"><strong>1. Zéro profit sur la nourriture</strong></p>
        <p style="margin:0 0 16px">Nous achetons au prix grossiste. Vous payez ce prix coûtant, plus <strong>20&nbsp;centimes</strong> fixes par article pour l’énergie, le loyer et le fonctionnement. <span style="color:#5b6b63;font-size:13px">(Prix cibles estimés, non contractuels.)</span></p>

        <p style="margin:0 0 6px"><strong>2. Le bénévolat (notre force)</strong></p>
        <p style="margin:0 0 16px">Chaque adulte actif consacre <strong>2&nbsp;heures par mois</strong> (caisse, rayons…). Moins de masse salariale = des prix plus bas pour tout le monde. Les plus jeunes et les seniors sont exemptés.</p>

        <p style="margin:0 0 6px"><strong>3. Le trésor commun</strong></p>
        <p style="margin:0 0 16px">Une fois le magasin ouvert : <strong>10&nbsp;€ / mois / personne</strong> (enfants inclus). Ce fonds collectif permet d’acheter en volume, sans dépendre du crédit bancaire classique.</p>

        <h2 style="font-size:17px;margin:28px 0 8px">Objectif pour ${escapeHtml(placeLabel)}</h2>
        <p><strong>10&nbsp;000 personnes</strong> (chaque membre du foyer compte) = le point de bascule pour ouvrir — pas la ligne d’arrivée.</p>
        <p>La <strong>première ville</strong> à franchir le cap accueille le magasin historique ; les suivantes entrent sur la roadmap d’ouverture. Aujourd’hui, vous ne payez rien : faites grandir le réseau, surtout près de chez vous.</p>

        <p style="margin:28px 0">
          <a href="${appUrl}" style="display:inline-block;background:#1f6f54;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600">
            Partager Pi COOP à 3 personnes
          </a>
        </p>

        <p>L’inflation n’est pas une fatalité. Reprenons le pouvoir d’achat, ensemble.</p>
        <p style="margin-top:28px">À très vite,<br/><strong>L’équipe fondatrice de Pi COOP</strong></p>
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
