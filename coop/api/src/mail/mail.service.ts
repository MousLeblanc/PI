import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

export type WelcomeMailContext = {
  email: string;
  postalCode: string;
  commune?: string | null;
};

const PUBLIC_SITE_URL = 'https://www.picoop.be';
/** Official Facebook page (resolved from share link). */
const FACEBOOK_PAGE_URL =
  'https://www.facebook.com/people/PI-COOP/61592984963066/';

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
    const siteUrl = this.publicSiteUrl();
    const shareUrl = `${siteUrl}/?cp=${encodeURIComponent(ctx.postalCode)}`;
    const shareText = `J’ai rejoint Pi COOP — futur coopérateur. Le nombre fait la force. Préinscription gratuite : ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent('Rejoins Pi COOP')}&body=${encodeURIComponent(shareText)}`;
    const subject =
      'Votre préinscription à Pi COOP est confirmée — voici la suite';

    const placeLabel = ctx.commune
      ? `${ctx.commune} (${ctx.postalCode})`
      : `votre code postal ${ctx.postalCode}`;

    const text = [
      'Bonjour et bienvenue dans l’aventure Pi COOP,',
      '',
      'Merci pour votre préinscription. Vous rejoignez un projet de supermarché coopératif pensé pour des prix de gros, avec des règles claires pour faire tenir le magasin.',
      '',
      'Pour le moment, la préinscription est 100 % gratuite et sans engagement.',
      '',
      'À l’ouverture (quand l’objectif de ménages sera atteint et que la coopérative sera constituée), le fonctionnement sera le suivant :',
      '',
      '1. L’équipement (part sociale)',
      'Vous devenez coopérateur en prenant au moins une part à 25 €. Cet argent sert uniquement à équiper le magasin (frigos, rayons, caisses) — pas le fonctionnement ni les courses.',
      '',
      '2. Le fonctionnement (abonnement)',
      '10 € / mois donnent droit à un plafond de 250 € d’achats. Famille ou gros volume : vous cumulez les abonnements. Cet argent paie le loyer, l’énergie du froid et l’équipe d’encadrement.',
      '',
      '3. Vos courses (carte prépayée)',
      'Vous rechargez votre carte membre à l’avance par virement. En rayon : prix de gros (direct producteur) + marge fixe — 20 centimes sur le sec, 50 centimes sur le frais et les produits chers — pour la casse et les invendus. Prix cibles estimés, non contractuels.',
      '',
      '4. Le secret des prix (2 h d’entraide)',
      'Chaque adulte de 18 à 65 ans du foyer donne 2 heures par mois en magasin (caisse, rayons…). Les plus jeunes et les plus de 65 ans sont exemptés, sauf s’ils le souhaitent. Sans ces heures, les prix ne tiennent pas.',
      '',
      `Prochaine étape — ${placeLabel}`,
      'Votre ménage compte pour 1. Objectif global : 5 000 ménages pour lancer. Les zones les plus mobilisées seront prioritaires.',
      'Dès qu’un bassin de vie atteint 50 ménages préinscrits, nous organisons une séance d’information. Y participer sera requis avant de souscrire des parts à l’ouverture.',
      '',
      'La meilleure façon d’accélérer : en parler autour de vous.',
      `Page Facebook Pi COOP : ${FACEBOOK_PAGE_URL}`,
      `Inviter autour de vous (WhatsApp) : ${whatsappUrl}`,
      `Partager le site sur Facebook : ${facebookShareUrl}`,
      `Ou par email : ${mailtoUrl}`,
      `Site : ${siteUrl}`,
      '',
      'À très vite,',
      'L’équipe Pi COOP',
    ].join('\n');

    const html = `
      <div style="font-family:Georgia,'Times New Roman',serif;line-height:1.55;color:#12261f;max-width:560px;margin:0 auto;padding:8px">
        <p style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#1f6f54;margin:0 0 6px">Pi COOP</p>
        <p style="font-size:13px;color:#1f6f54;margin:0 0 14px;font-style:italic">Le nombre fait la force</p>
        <h1 style="font-size:22px;line-height:1.3;margin:0 0 18px;font-weight:600">Bienvenue — préinscription confirmée</h1>
        <p>Bonjour et bienvenue dans l’aventure <strong>Pi COOP</strong>,</p>
        <p>Merci pour votre préinscription. Vous rejoignez un projet de supermarché coopératif pensé pour des <strong>prix de gros</strong>, avec des règles claires pour faire tenir le magasin.</p>
        <p>Pour le moment, la préinscription est <strong>100&nbsp;% gratuite</strong> et sans engagement.</p>

        <h2 style="font-size:17px;margin:28px 0 12px">À l’ouverture, comment ça marchera&nbsp;?</h2>
        <p style="margin:0 0 16px;color:#5b6b63;font-size:14px">Quand l’objectif de ménages sera atteint et que la coopérative sera constituée.</p>

        <p style="margin:0 0 6px"><strong>1. L’équipement (part sociale)</strong></p>
        <p style="margin:0 0 16px">Vous devenez coopérateur en prenant au moins une part à <strong>25&nbsp;€</strong>. Cet argent sert uniquement à équiper le magasin (frigos, rayons, caisses) — pas le fonctionnement ni les courses.</p>

        <p style="margin:0 0 6px"><strong>2. Le fonctionnement (abonnement)</strong></p>
        <p style="margin:0 0 16px"><strong>10&nbsp;€ / mois</strong> donnent droit à un plafond de <strong>250&nbsp;€</strong> d’achats. Famille ou gros volume&nbsp;: vous cumulez les abonnements. Cet argent paie le loyer, l’énergie du froid et l’équipe d’encadrement.</p>

        <p style="margin:0 0 6px"><strong>3. Vos courses (carte prépayée)</strong></p>
        <p style="margin:0 0 16px">Vous rechargez votre carte membre à l’avance par virement. En rayon&nbsp;: prix de gros (direct producteur) + marge fixe — <strong>20&nbsp;centimes</strong> sur le sec, <strong>50&nbsp;centimes</strong> sur le frais et les produits chers — pour la casse et les invendus. <span style="color:#5b6b63;font-size:13px">(Prix cibles estimés, non contractuels.)</span></p>

        <p style="margin:0 0 6px"><strong>4. Le secret des prix (2&nbsp;h d’entraide)</strong></p>
        <p style="margin:0 0 16px">Chaque adulte de <strong>18 à 65 ans</strong> du foyer donne <strong>2&nbsp;heures par mois</strong> en magasin (caisse, rayons…). Les plus jeunes et les plus de 65 ans sont <strong>exemptés, sauf s’ils le souhaitent</strong>. Sans ces heures, les prix ne tiennent pas.</p>

        <h2 style="font-size:17px;margin:28px 0 8px">Prochaine étape — ${escapeHtml(placeLabel)}</h2>
        <p>Votre ménage compte pour <strong>1</strong>. Objectif global&nbsp;: <strong>5&nbsp;000 ménages</strong> pour lancer. Les zones les plus mobilisées seront prioritaires.</p>
        <p>Dès qu’un bassin de vie atteint <strong>50 ménages</strong> préinscrits, nous organisons une <strong>séance d’information</strong>. Y participer sera <strong>requis avant de souscrire des parts</strong> à l’ouverture.</p>
        <p>La meilleure façon d’accélérer&nbsp;: en parler autour de vous.</p>

        <p style="margin:28px 0 10px">
          <a href="${escapeHtml(FACEBOOK_PAGE_URL)}" style="display:inline-block;background:#1f6f54;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600">
            Suivre Pi COOP sur Facebook
          </a>
        </p>
        <p style="margin:0 0 10px">
          <a href="${escapeHtml(whatsappUrl)}" style="display:inline-block;background:#ffffff;color:#1f6f54;border:2px solid #1f6f54;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600">
            Partager autour de moi (WhatsApp)
          </a>
        </p>
        <p style="margin:0 0 12px">
          <a href="${escapeHtml(facebookShareUrl)}" style="display:inline-block;background:#ffffff;color:#1f6f54;border:2px solid #1f6f54;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600">
            Partager le site sur Facebook
          </a>
        </p>
        <p style="font-size:13px;color:#5b6b63;margin:0 0 16px">
          Ou
          <a href="${escapeHtml(mailtoUrl)}" style="color:#1f6f54">envoyer un email</a>
          ·
          <a href="${escapeHtml(siteUrl)}" style="color:#1f6f54">${escapeHtml(siteUrl)}</a>
        </p>

        <p style="margin-top:28px">À très vite,<br/><strong>L’équipe Pi COOP</strong></p>
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

  /** Never put localhost in emails: MetaMask hijacks it as a dapp URL. */
  private publicSiteUrl(): string {
    const raw = (this.config.get<string>('APP_PUBLIC_URL') ?? '').trim();
    try {
      const parsed = new URL(raw);
      const host = parsed.hostname.toLowerCase();
      if (parsed.protocol !== 'https:') return PUBLIC_SITE_URL;
      if (host === 'localhost' || host === '127.0.0.1') return PUBLIC_SITE_URL;
      return parsed.origin;
    } catch {
      return PUBLIC_SITE_URL;
    }
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
