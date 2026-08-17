import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

export type WelcomeMailContext = {
  email: string;
  postalCode: string;
  commune?: string | null;
};

const PUBLIC_SITE_URL = 'https://www.picoop.be';

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
    const shareText = `Rejoins Pi COOP — supermarché citoyen à prix grossiste + 20 centimes. Préinscription gratuite : ${siteUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent('Rejoins Pi COOP')}&body=${encodeURIComponent(shareText)}`;
    // No emoji in subject: better inbox placement than spam
    const subject = 'Bienvenue chez Pi COOP — vous êtes co-propriétaire';

    const placeLabel = ctx.commune
      ? `${ctx.commune} (${ctx.postalCode})`
      : `votre code postal ${ctx.postalCode}`;

    const text = [
      'Bonjour,',
      '',
      'Votre préinscription est confirmée. Bienvenue du bon côté de la distribution.',
      'En rejoignant Pi COOP, vous n’êtes pas un simple client : vous devenez co-fondateur et co-propriétaire de votre supermarché citoyen.',
      '',
      'Comment allons-nous casser les prix ? Nos 3 piliers :',
      '',
      '1. Zéro profit sur la nourriture',
      'Nous achetons au grossiste, vous payez ce prix coûtant. On ajoute seulement une marge fixe et transparente (20 centimes sur le quotidien, 50 centimes sur les produits plus chers : huile, langes…). Prix cibles estimés, non contractuels.',
      '',
      '2. La force du nombre',
      'Chaque adulte de 18–64 ans donne 2 heures par mois (caisse, rayons…). Les 0–17 ans et les 65+ sont exemptés. Moins de masse salariale = des prix plus bas.',
      '',
      '3. Votre part dans la coopérative',
      'Une fois le magasin ouvert : 10 € / mois / personne (enfants inclus). Ce n’est pas un abonnement : c’est votre part dans la coopérative, pour acheter en volume sans dépendre du crédit bancaire classique.',
      '',
      `La course aux 10 000 — ${placeLabel}`,
      'La première zone à 10 000 personnes (chaque membre du foyer compte) débloque le magasin historique. Les suivantes suivent sur la roadmap. Votre inscription allonge le compteur π d’une décimale par personne du foyer.',
      '',
      'Aujourd’hui vous ne payez rien. Le bouche-à-oreille est notre seule publicité.',
      `Inviter 3 voisins ou amis (WhatsApp) : ${whatsappUrl}`,
      `Ou par email : ${mailtoUrl}`,
      `Site : ${siteUrl}`,
      '',
      'L’inflation n’est pas une fatalité. Reprenons le pouvoir d’achat, ensemble.',
      '',
      'À très vite,',
      'L’équipe fondatrice de Pi COOP',
    ].join('\n');

    const html = `
      <div style="font-family:Georgia,'Times New Roman',serif;line-height:1.55;color:#12261f;max-width:560px;margin:0 auto;padding:8px">
        <p style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#1f6f54;margin:0 0 10px">Pi COOP</p>
        <h1 style="font-size:22px;line-height:1.3;margin:0 0 18px;font-weight:600">Bienvenue — vous êtes co-propriétaire</h1>
        <p>Bonjour,</p>
        <p>Votre préinscription est confirmée. Bienvenue du bon côté de la distribution.</p>
        <p>En rejoignant <strong>Pi COOP</strong>, vous n’êtes pas un simple client : vous devenez <strong>co-fondateur et co-propriétaire</strong> de votre supermarché citoyen.</p>

        <h2 style="font-size:17px;margin:28px 0 12px">Comment allons-nous casser les prix&nbsp;?</h2>

        <p style="margin:0 0 6px"><strong>1. Zéro profit sur la nourriture</strong></p>
        <p style="margin:0 0 16px">Nous achetons au grossiste, vous payez ce prix coûtant. On ajoute seulement une marge fixe et transparente : <strong>20&nbsp;centimes</strong> sur le quotidien, <strong>50&nbsp;centimes</strong> sur les produits plus chers (huile, langes…). <span style="color:#5b6b63;font-size:13px">(Prix cibles estimés, non contractuels.)</span></p>

        <p style="margin:0 0 6px"><strong>2. La force du nombre</strong></p>
        <p style="margin:0 0 16px">Chaque adulte de 18–64 ans donne <strong>2&nbsp;heures par mois</strong> (caisse, rayons…). Les 0–17 ans et les 65+ sont exemptés. Moins de masse salariale = des prix plus bas.</p>

        <p style="margin:0 0 6px"><strong>3. Votre part dans la coopérative</strong></p>
        <p style="margin:0 0 16px">Une fois le magasin ouvert : <strong>10&nbsp;€ / mois / personne</strong> (enfants inclus). Ce n’est pas un abonnement : c’est votre part dans la coopérative, pour acheter en volume sans dépendre du crédit bancaire classique.</p>

        <h2 style="font-size:17px;margin:28px 0 8px">La course aux 10&nbsp;000 — ${escapeHtml(placeLabel)}</h2>
        <p>La première zone à <strong>10&nbsp;000 personnes</strong> (chaque membre du foyer compte) débloque le magasin historique. Les suivantes suivent sur la roadmap. Votre inscription allonge le compteur π.</p>
        <p>Aujourd’hui vous ne payez rien. Le bouche-à-oreille est notre seule publicité.</p>

        <p style="margin:28px 0 12px">
          <a href="${escapeHtml(whatsappUrl)}" style="display:inline-block;background:#1f6f54;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600">
            Partager Pi COOP autour de moi
          </a>
        </p>
        <p style="font-size:13px;color:#5b6b63;margin:0 0 16px">
          Ou
          <a href="${escapeHtml(mailtoUrl)}" style="color:#1f6f54">envoyer un email</a>
          ·
          <a href="${escapeHtml(siteUrl)}" style="color:#1f6f54">${escapeHtml(siteUrl)}</a>
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
