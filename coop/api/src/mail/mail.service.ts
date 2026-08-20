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
      'Félicitations — bienvenue chez Pi COOP, futur coopérateur';

    const placeLabel = ctx.commune
      ? `${ctx.commune} (${ctx.postalCode})`
      : `votre code postal ${ctx.postalCode}`;

    const text = [
      'Bonjour,',
      '',
      'Félicitations. Votre préinscription est confirmée.',
      'En rejoignant Pi COOP, vous n’êtes pas un simple client : vous devenez futur coopérateur de votre supermarché citoyen.',
      '',
      'Le nombre fait la force.',
      '',
      'Comment allons-nous casser les prix ?',
      '',
      '1. Marge fixe, jamais cachée',
      'Prix grossiste + 20 centimes sur le quotidien, + 50 centimes sur les produits plus chers (huile, langes…). Prix cibles estimés, non contractuels.',
      '',
      '2. La force du nombre',
      'Plus on est nombreux dans votre bassin de vie, plus on négocie fort. Objectif : 10 000 personnes pour ouvrir.',
      '',
      '3. L’entraide (à l’ouverture)',
      'Chaque adulte de 18–64 ans donne 2 heures par mois (caisse, rayons…). Les 0–17 ans et les 65+ sont exemptés.',
      '',
      '4. Votre cotisation (à l’ouverture)',
      'Une fois la coopérative constituée et le magasin ouvert : 10 € / mois / personne (enfants inclus). Ce n’est pas un abonnement : c’est votre contribution de membre.',
      '',
      `La course aux 10 000 — ${placeLabel}`,
      'La première zone à 10 000 personnes (chaque membre du foyer compte) ouvre en premier. Votre foyer allonge le compteur π.',
      '',
      'La préinscription est gratuite. Notre seule publicité : le bouche-à-oreille.',
      `Page Facebook Pi COOP : ${FACEBOOK_PAGE_URL}`,
      `Inviter autour de vous (WhatsApp) : ${whatsappUrl}`,
      `Partager le site sur Facebook : ${facebookShareUrl}`,
      `Ou par email : ${mailtoUrl}`,
      `Site : ${siteUrl}`,
      '',
      'L’inflation n’est pas une fatalité. Reprenons le pouvoir d’achat, ensemble.',
      '',
      'À très vite,',
      'L’équipe Pi COOP',
    ].join('\n');

    const html = `
      <div style="font-family:Georgia,'Times New Roman',serif;line-height:1.55;color:#12261f;max-width:560px;margin:0 auto;padding:8px">
        <p style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#1f6f54;margin:0 0 6px">Pi COOP</p>
        <p style="font-size:13px;color:#1f6f54;margin:0 0 14px;font-style:italic">Le nombre fait la force</p>
        <h1 style="font-size:22px;line-height:1.3;margin:0 0 18px;font-weight:600">Félicitations — vous êtes futur coopérateur</h1>
        <p>Bonjour,</p>
        <p><strong>Félicitations.</strong> Votre préinscription est confirmée.</p>
        <p>En rejoignant <strong>Pi COOP</strong>, vous n’êtes pas un simple client : vous devenez <strong>futur coopérateur</strong> de votre supermarché citoyen.</p>

        <h2 style="font-size:17px;margin:28px 0 12px">Comment allons-nous casser les prix&nbsp;?</h2>

        <p style="margin:0 0 6px"><strong>1. Marge fixe, jamais cachée</strong></p>
        <p style="margin:0 0 16px">Prix grossiste + <strong>20&nbsp;centimes</strong> sur le quotidien, + <strong>50&nbsp;centimes</strong> sur les produits plus chers (huile, langes…). <span style="color:#5b6b63;font-size:13px">(Prix cibles estimés, non contractuels.)</span></p>

        <p style="margin:0 0 6px"><strong>2. La force du nombre</strong></p>
        <p style="margin:0 0 16px">Plus on est nombreux dans votre bassin de vie, plus on négocie fort. Objectif&nbsp;: <strong>10&nbsp;000 personnes</strong> pour ouvrir.</p>

        <p style="margin:0 0 6px"><strong>3. L’entraide (à l’ouverture)</strong></p>
        <p style="margin:0 0 16px">Chaque adulte de 18–64 ans donne <strong>2&nbsp;heures par mois</strong> (caisse, rayons…). Les 0–17 ans et les 65+ sont exemptés.</p>

        <p style="margin:0 0 6px"><strong>4. Votre cotisation (à l’ouverture)</strong></p>
        <p style="margin:0 0 16px">Une fois la coopérative constituée et le magasin ouvert&nbsp;: <strong>10&nbsp;€ / mois / personne</strong> (enfants inclus). Ce n’est pas un abonnement&nbsp;: c’est votre contribution de membre.</p>

        <h2 style="font-size:17px;margin:28px 0 8px">La course aux 10&nbsp;000 — ${escapeHtml(placeLabel)}</h2>
        <p>La première zone à <strong>10&nbsp;000 personnes</strong> (chaque membre du foyer compte) ouvre en premier. Votre foyer allonge le compteur π.</p>
        <p>La préinscription est <strong>gratuite</strong>. Notre seule publicité&nbsp;: le bouche-à-oreille.</p>

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

        <p>L’inflation n’est pas une fatalité. Reprenons le pouvoir d’achat, ensemble.</p>
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
