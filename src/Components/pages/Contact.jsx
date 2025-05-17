import React from 'react';
import toast from 'react-hot-toast';



export  function Contact() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key","eed9404d-69fb-4573-ba81-a7bc46cb57be");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };



  const handleSend = () => {
  
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      toast.success("Email submitted successfully!");
    } else {
      toast.error("Wait 5 minutes and try again.");
    }
  };


  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-400 text-sm md:text-base mb-5">
            Reach out to us for support, inquiries, or collaboration.
          </p>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              required
              name='name'
              className="p-2 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-400 text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              required
              name='email'
              className="p-2 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-400 text-sm"
            />
            <textarea
              placeholder="Message"
              rows="4"
              required
              name='message'
              className="p-2 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-400 text-sm"
            />
            <button
              type="submit"
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white text-sm font-semibold"
            >
              Send
            </button>
          </form>
        </div>
      </section>

    
      <hr className="w-full h-[4px] border-none bg-gradient-to-r from-blue-500 via-white to-blue-500 animate-colorChange" />
    </>
  );
}

export default Contact;
