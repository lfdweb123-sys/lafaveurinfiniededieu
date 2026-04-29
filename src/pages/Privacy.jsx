import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Politique de Confidentialité</h1>
        <p className="text-gray-500 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Chez <strong>La Faveur Infinie de Dieu (LFD)</strong>, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. Informations que nous collectons</h2>
          <p className="text-gray-600 mb-4">Nous collectons les informations suivantes :</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Informations d'identification</strong> : nom, prénom, adresse email, numéro de téléphone</li>
            <li><strong>Informations professionnelles</strong> : nom de l'entreprise, poste</li>
            <li><strong>Données de communication</strong> : messages que vous nous envoyez via le formulaire de contact</li>
            <li><strong>Données d'utilisation</strong> : adresse IP, type de navigateur, pages visitées, durée de visite</li>
            <li><strong>Cookies</strong> : nous utilisons des cookies pour améliorer votre expérience</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. Comment nous utilisons vos informations</h2>
          <p className="text-gray-600 mb-4">Nous utilisons vos informations pour :</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Répondre à vos demandes de contact et devis</li>
            <li>Vous informer sur nos services et produits</li>
            <li>Améliorer notre site web et nos services</li>
            <li>Analyser le trafic et les performances du site</li>
            <li>Respecter nos obligations légales</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. Base légale du traitement</h2>
          <p className="text-gray-600 mb-6">
            Nous traitons vos données personnelles sur la base de :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Votre consentement</strong> : lorsque vous remplissez un formulaire de contact</li>
            <li><strong>Notre intérêt légitime</strong> : pour améliorer nos services et communiquer avec vous</li>
            <li><strong>Les obligations légales</strong> : pour la conservation de certaines données</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. Partage de vos informations</h2>
          <p className="text-gray-600 mb-4">
            Nous ne vendons pas vos données personnelles. Nous pouvons partager vos informations avec :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Prestataires techniques</strong> : hébergement (Vercel, Firebase), analyse (Google Analytics)</li>
            <li><strong>Partenaires</strong> : uniquement si nécessaire pour fournir nos services</li>
            <li><strong>Autorités légales</strong> : si requis par la loi</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. Conservation des données</h2>
          <p className="text-gray-600 mb-6">
            Nous conservons vos données personnelles pendant la durée nécessaire à la finalité pour laquelle elles ont été collectées :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Demandes de contact : 3 ans après le dernier contact</li>
            <li>Données de facturation : 10 ans (obligation fiscale)</li>
            <li>Données d'analyse : 14 mois (Google Analytics)</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">6. Sécurité des données</h2>
          <p className="text-gray-600 mb-6">
            Nous mettons en œuvre des mesures de sécurité pour protéger vos données :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Chiffrement SSL/TLS pour toutes les transmissions</li>
            <li>Accès restreint aux données personnelles</li>
            <li>Surveillance régulière de notre infrastructure</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">7. Vos droits (RGPD)</h2>
          <p className="text-gray-600 mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Droit d'accès</strong> : connaître les données que nous détenons sur vous</li>
            <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
            <li><strong>Droit à la limitation</strong> : restreindre le traitement de vos données</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
          </ul>
          <p className="text-gray-600 mb-6">
            Pour exercer ces droits, contactez-nous à <a href="mailto:contact@lfdweb.com" className="text-[#C8931A] hover:underline">contact@lfdweb.com</a>.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">8. Cookies</h2>
          <p className="text-gray-600 mb-6">
            Nous utilisons des cookies essentiels au fonctionnement du site et des cookies d'analyse (Google Analytics). Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">9. Modifications de cette politique</h2>
          <p className="text-gray-600 mb-6">
            Nous pouvons mettre à jour cette politique de confidentialité. En cas de changement important, nous vous en informerons par email ou via une notification sur notre site.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">10. Contact</h2>
          <p className="text-gray-600 mb-2">
            Pour toute question concernant cette politique :
          </p>
          <p className="text-gray-600 mb-2">
            <strong>La Faveur Infinie de Dieu</strong><br />
            Email : <a href="mailto:contact@lfdweb.com" className="text-[#C8931A] hover:underline">contact@lfdweb.com</a><br />
            Téléphone : <a href="tel:+22912345678" className="text-[#C8931A] hover:underline">+229 12 34 56 78</a><br />
            Cotonou, Bénin
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <Link to="/" className="text-[#C8931A] hover:underline">← Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}