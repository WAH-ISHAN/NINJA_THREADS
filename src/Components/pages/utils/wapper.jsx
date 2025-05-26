import { Clock3, Percent, ShieldCheck, Truck } from "lucide-react";

export function Wrapper() {
  return (
    <div className="lg:container mx-auto bg-[#1b1b1b] shadow-xl p-5 rounded-2xl transition-all duration-300 hover:shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div >
          <div className="flex items-center gap-4">
            <Percent size="2rem" />
            <div>
              <h4 className="text-base text-[#8b3838] font-inter font-medium mb-2.5">
                Discount
              </h4>
              <p className="text-sm text-[#9a9caa] font-inter font-normal">
                Every week new sales
              </p>
            </div>
          </div>
        </div>

        <div >
          <div className="flex items-center gap-4">
            <Truck size="2rem" />
            <div>
              <h4 className="text-base text-[#8b3838] font-inter font-medium mb-2.5">
                Free Delivery
              </h4>
              <p className="text-sm text-[#9a9caa] font-inter font-normal">
                100% Free for all orders
              </p>
            </div>
          </div>
        </div>

        <div >
          <div className="flex items-center gap-4">
            <Clock3 size="3rem" />
            <div>
              <h4 className="text-base text-[#8b3838] font-inter font-medium mb-2.5">
                Great Support 24/7
              </h4>
              <p className="text-sm text-[#9a9caa] font-inter font-normal">
                We care about your experience
              </p>
            </div>
          </div>
        </div>

        <div >
          <div className="flex items-center gap-4">
            <ShieldCheck size="3rem" />
            <div>
              <h4 className="text-base text-[#8b3838] font-inter font-medium mb-2.5">
                Secure Payment
              </h4>
              <p className="text-sm text-[#9a9caa] font-inter font-normal">
                100% Secure payment method
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
