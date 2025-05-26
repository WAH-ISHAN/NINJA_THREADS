import React from 'react';
import Slider from 'react-slick';
import { User } from 'phosphor-react'; // Or your icon library

//got chatgpt
const SectionTitle = ({title, mb, textAlign}) => {
    const margin = mb || 'mb-0';
    return (
        <div className={`w-full flex items-center  ${
            textAlign === 'center' ? `justify-${textAlign}` : 'justify-start'
        }`}>
            <h3 className={`text-2xl text-white font-semibold font-inter capitalize ${margin}`}>{title}</h3>
        </div>
    );
};



export function ClientReact() {
  const clientSays = [
    {
      id: 1,
      description: 'Null',
      name: 'Null',
      
    },
    {
      id: 2,
      description: 'Null',
      name: 'Null',
      
    },
    {
      id: 3,
      description: 'Null',
      name: 'Null',
      
    },
    {
      id: 4,
      description: 'Null',
      name: 'Null',
      
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="lg:container mx-auto bg-[#000000] rounded-lg p-8">
      <SectionTitle title="What our clients say about us" mb ="mb-11" />

      <div className="slider-container w-full h-full bg-gray-80 ">
        <Slider {...settings}>
          {clientSays.map((client) => (
            <div key={client.id} className="p-2 border-[0.5px] border-[#000000] rounded-lg bg-[#1b1b1b]">
              <p className="text-1xl mb-2 text-[#ffffff] font-inter font-normal client_say_description">
                {client.description}
              </p>
              <div className="flex items-center">
                <h4>
                  <User size="2rem" />
                </h4>
                <div className="ml-4">
                  <h4 className="text-2xl text-[#ffffff] font-inter font-medium capitalize mb-1.5">
                    {client.name}
                  </h4>
                  <p className="text-base text-[#ffffff] font-inter capitalize font-normal">
                    {client.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ClientReact;
