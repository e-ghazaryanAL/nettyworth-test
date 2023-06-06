import { ContactUsForm } from '../../components/dashboard/contact-us/ContactUsForm';
import { ContactUs } from '../../components/dashboard/contact-us/ContactUsHeader';

const ContactUsPage = () => {
  return (
    <>
      <div className='bg-[#DAE1F3] w-full h-full flex flex-col gap-[1px]'>
        <ContactUs />
        <ContactUsForm />
      </div>
    </>
  );
};

export default ContactUsPage;
