import nodemailer from "nodemailer";


export const sendMail=async (subject, content,email)=>{
  try {
    
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: content,
    };
    
    const info = await transporter.sendMail(mailOptions);
    // console.log(info);
    return info
    
  } catch (error) {
    return false
  }  
  
}



