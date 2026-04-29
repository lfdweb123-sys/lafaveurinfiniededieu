import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conditions Générales d'Utilisation</h1>
        <p className="text-gray-500 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Les présentes conditions générales d'utilisation (CGU) régissent l'accès et l'utilisation du site web <strong>La Faveur Infinie de Dieu (LFD)</strong>, disponible à l'adresse <a href="https://www.lfdweb.com" className="text-[#C8931A] hover:underline">www.lfdweb.com</a>.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. Acceptation des conditions</h2>
          <p className="text-gray-600 mb-6">
            En utilisant notre site web, vous acceptez d'être lié par les présentes conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. Présentation du site</h2>
          <p className="text-gray-600 mb-6">
            Le site www.lfdweb.com est édité par <strong>La Faveur Infinie de Dieu</strong>, une entreprise basée à Cotonou, Bénin.
          </p>
          <p className="text-gray-600 mb-6">
            Notre site présente nos services et produits :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Développement web et mobile</li>
            <li>Solutions cloud et APIs</li>
            <li>Design UI/UX</li>
            <li>Produits SaaS (Passerelle de paiement, Facture App)</li>
            <li>Conseil technique</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. Propriété intellectuelle</h2>
          <p className="text-gray-600 mb-6">
            L'ensemble du contenu du site (textes, images, logos, vidéos, code source) est la propriété exclusive de La Faveur Infinie de Dieu et est protégé par les lois sur la propriété intellectuelle.
          </p>
          <p className="text-gray-600 mb-6">
            Toute reproduction, représentation, modification ou exploitation du contenu sans autorisation préalable est interdite.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. Liens hypertextes</h2>
          <p className="text-gray-600 mb-6">
            Notre site peut contenir des liens vers des sites tiers. Nous ne sommes pas responsables du contenu de ces sites ni de leurs pratiques en matière de confidentialité.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. Responsabilité</h2>
          <p className="text-gray-600 mb-6">
            <strong>Responsabilité de LFD :</strong> Nous nous efforçons de fournir des informations exactes et à jour, mais ne pouvons garantir l'exhaustivité ou l'absence d'erreur. Notre responsabilité ne peut être engagée pour :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Les interruptions ou indisponibilités du site</li>
            <li>Les dommages indirects liés à l'utilisation du site</li>
            <li>Les virus ou attaques informatiques</li>
          </ul>
          <p className="text-gray-600 mb-6">
            <strong>Responsabilité de l'utilisateur :</strong> Vous êtes responsable de l'utilisation que vous faites des informations présentes sur notre site et de respecter les lois applicables.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">6. Formulaire de contact et demandes de devis</h2>
          <p className="text-gray-600 mb-6">
            En utilisant notre formulaire de contact, vous nous autorisez à vous répondre et à conserver vos informations pour le suivi de votre demande. Les devis fournis sont valables 30 jours sauf mention contraire.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">7. Données personnelles</h2>
          <p className="text-gray-600 mb-6">
            La collecte et le traitement de vos données personnelles sont régis par notre <Link to="/privacy" className="text-[#C8931A] hover:underline">Politique de Confidentialité</Link>.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">8. Modification des conditions</h2>
          <p className="text-gray-600 mb-6">
            Nous pouvons modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Nous vous encourageons à consulter régulièrement cette page.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">9. Loi applicable et juridiction</h2>
          <p className="text-gray-600 mb-6">
            Les présentes conditions sont régies par le droit béninois. En cas de litige, une solution amiable sera recherchée avant toute procédure judiciaire. À défaut d'accord, le litige sera soumis aux tribunaux compétents de Cotonou, Bénin.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">10. Contact</h2>
          <p className="text-gray-600 mb-2">
            Pour toute question concernant ces conditions :
          </p>
          <p className="text-gray-600 mb-2">
            <strong>La Faveur Infinie de Dieu</strong><br />
            Email : <a href="mailto:contact@lfdweb.com" className="text-[#C8931A] hover:underline">contact@lfdweb.com</a><br />
            Téléphone : <a href="tel:+22912345678" className="text-[#C8931A] hover:underline">+229 12 34 56 78</a><br />
            Cotonou, Bénin
          </p>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>⚠️ Important :</strong> Ces conditions sont fournies à titre informatif. Pour un avis juridique adapté à votre situation spécifique, consultez un avocat.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <Link to="/" className="text-[#C8931A] hover:underline">← Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}