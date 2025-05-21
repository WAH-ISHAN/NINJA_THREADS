
import { AddToCard } from '../utils/card';

export function Product() {
  return (
    <>
      <section className="py-20 bg-black text-white px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-6">Cloud Service Plans</h2>
          <p className="text-gray-400">
            Choose the best plan that fits your needs and get started today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          
          <PlanCard
            title="1 Month Plan"
            price="$10"
            features={['Full access to cloud features', 'Standard support']}
          />

         
          <PlanCard
            title="5 Month Plan"
            price="$50"
            features={['Full access to cloud features', 'Priority support']}
          />

          
          <PlanCard
            title="12 Month Plan"
            price="$100"
            features={['Full access to cloud features', '24/7 premium support', 'Free updates']}
          />
        </div>

       
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-6">Software Service</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          
          <PlanCard
            title="1 Month Plan"
            price="$10"
            features={['Access to core software features', 'Monthly updates', 'Standard customer support']}
          />

          
          <PlanCard
            title="5 Month Plan"
            price="$50"
            features={['Access to full software suite', 'Priority updates and patches', 'Priority support']}
          />

          
          <PlanCard
            title="12 Month Plan"
            price="$100"
            features={[
              'Full software access + premium features',
              'Exclusive beta access',
              '24/7 premium support',
              'All updates included',
            ]}
          />
        </div>

        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-6">Additional Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PlanCard
            title="SEO Optimization"
            price="$30"
            features={['Website audit', 'Keyword research', 'On-page optimization']}
          />
          <PlanCard
            title="Data Backup Service"
            price="$20"
            features={['Daily automated backups', 'Cloud storage', 'Data recovery support']}
          />
          <PlanCard
            title="Email Marketing"
            price="$40"
            features={['Custom campaign setup', 'Analytics & reporting', 'A/B testing']}
          />
        </div>
      </section>

      
      <hr className="w-full h-[5px] border-none bg-gradient-to-r from-blue-500 via-white to-blue-500 bg-[length:100%_100%] animate-colorChange" />
    </>
  );
}
function PlanCard({ title, price, features }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl duration-300 transition-transform hover:-translate-y-2">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-blue-400 mb-6">{price}</p>
      <ul className="text-gray-400 mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index}>✔ {feature}</li>
        ))}
      </ul>
      
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-lg font-medium transition-colors">
        Buy Now
      </button>
      <button onClick={AddToCard}  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-lg font-medium transition-colors mt-3">
        ADD Card
      </button>
    </div>
  );
}



export default Product;
