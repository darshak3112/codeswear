import React from "react";

const Contact = () => {
  return (
    <div>
      <div className="min-h-screen">
  <div className="max-w-screen-xl md:mt-24 px-4 md:px-8 lg:px-12 xl:px-26 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
    <div className="flex flex-col justify-center items-center">
      <div>
        <h2 className="text-center text-3xl font-bold leading-tight">
          Lets talk about everything!
        </h2>
        <img className="h-40 mx-auto py-2" src="codeswearcircle.png" />
        <p className="text-center text-xl lg:text-2xl font-medium leading-tight">
          Feel free to ask us anything!
        </p>
        <p className="py-4 px-4 text-md lg:text-md leading-tight text-center">
          If you have any questions regarding your order, feel free to send
          email, call or Whatsapp us on our support number
        </p>
        <div className="flex justify-between">
          <div className="text-center px-5 md:px-0 md:text-left py-10">
            <span className="font-bold">Corporate Address</span>
            <br />
            codeswear.com
            <br />
            AB-76, PrafullaKanan Kestopur
            <br />
            Kolkata-700101
            <br />
          </div>
          <div className="text-center px-5 md:px-0 md:text-left py-10">
            <span className="font-bold">Customer Support</span>
            <br />
            Call/Whatsapp:
            <a
              className="underline text-blue-600"
              rel="noreferrer"
              target="_blank"
              href="https://wa.me/9748312831?text=Hi,%20I%20need%20to%20enquire%20about%20products%20on%20CodesWear"
            >
              +91 974 831 2831
            </a>
            <br />
            Email: care@codeswear.in
            <br />
            Morning: 9AM - 6PM
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Contact;
