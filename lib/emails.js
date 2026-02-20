// Email notification utility using Resend (or can be swapped with any email service)
// For Vercel deployment, you can use Resend, SendGrid, or Nodemailer

const EMAIL_FROM = process.env.EMAIL_FROM || "Schedulrr <noreply@schedulrr.com>";

// Email templates
export const emailTemplates = {
  bookingConfirmation: ({ guestName, eventTitle, hostName, startTime, endTime, meetLink }) => ({
    subject: `Booking Confirmed: ${eventTitle} with ${hostName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Booking Confirmed! 🎉</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi <strong>${guestName}</strong>,</p>
            
            <p>Your meeting has been successfully scheduled!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <h2 style="margin: 0 0 15px 0; color: #2563eb;">${eventTitle}</h2>
              <p style="margin: 8px 0;"><strong>📅 Date & Time:</strong> ${startTime} - ${endTime}</p>
              <p style="margin: 8px 0;"><strong>👤 With:</strong> ${hostName}</p>
            </div>
            
            ${meetLink ? `
              <div style="text-align: center; margin: 30px 0;">
                <a href="${meetLink}" style="background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Join Google Meet
                </a>
              </div>
            ` : ''}
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
              Add this event to your calendar to receive reminders.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
            <p>Powered by <strong>Schedulrr</strong></p>
          </div>
        </body>
      </html>
    `,
    text: `
      Booking Confirmed!
      
      Hi ${guestName},
      
      Your meeting has been successfully scheduled!
      
      Event: ${eventTitle}
      Date & Time: ${startTime} - ${endTime}
      With: ${hostName}
      ${meetLink ? `Meet Link: ${meetLink}` : ''}
      
      Powered by Schedulrr
    `,
  }),

  bookingNotificationToHost: ({ guestName, guestEmail, eventTitle, startTime, endTime, additionalInfo, meetLink }) => ({
    subject: `New Booking: ${eventTitle} with ${guestName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Booking! 📅</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 18px;">Someone has booked a meeting with you!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <h2 style="margin: 0 0 15px 0; color: #059669;">${eventTitle}</h2>
              <p style="margin: 8px 0;"><strong>👤 Guest:</strong> ${guestName}</p>
              <p style="margin: 8px 0;"><strong>📧 Email:</strong> ${guestEmail}</p>
              <p style="margin: 8px 0;"><strong>📅 Date & Time:</strong> ${startTime} - ${endTime}</p>
              ${additionalInfo ? `<p style="margin: 8px 0;"><strong>📝 Notes:</strong> ${additionalInfo}</p>` : ''}
            </div>
            
            ${meetLink ? `
              <div style="text-align: center; margin: 30px 0;">
                <a href="${meetLink}" style="background: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Join Google Meet
                </a>
              </div>
            ` : ''}
          </div>
          
          <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
            <p>Powered by <strong>Schedulrr</strong></p>
          </div>
        </body>
      </html>
    `,
    text: `
      New Booking!
      
      Someone has booked a meeting with you!
      
      Event: ${eventTitle}
      Guest: ${guestName}
      Email: ${guestEmail}
      Date & Time: ${startTime} - ${endTime}
      ${additionalInfo ? `Notes: ${additionalInfo}` : ''}
      ${meetLink ? `Meet Link: ${meetLink}` : ''}
      
      Powered by Schedulrr
    `,
  }),

  meetingCancellation: ({ recipientName, eventTitle, hostName, startTime, reason }) => ({
    subject: `Meeting Cancelled: ${eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Meeting Cancelled</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 18px;">Hi <strong>${recipientName}</strong>,</p>
            
            <p>Unfortunately, the following meeting has been cancelled:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h2 style="margin: 0 0 15px 0; color: #dc2626;">${eventTitle}</h2>
              <p style="margin: 8px 0;"><strong>📅 Scheduled for:</strong> ${startTime}</p>
              <p style="margin: 8px 0;"><strong>👤 With:</strong> ${hostName}</p>
              ${reason ? `<p style="margin: 8px 0;"><strong>📝 Reason:</strong> ${reason}</p>` : ''}
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
              Please feel free to book another time that works for you.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
            <p>Powered by <strong>Schedulrr</strong></p>
          </div>
        </body>
      </html>
    `,
    text: `
      Meeting Cancelled
      
      Hi ${recipientName},
      
      Unfortunately, the following meeting has been cancelled:
      
      Event: ${eventTitle}
      Scheduled for: ${startTime}
      With: ${hostName}
      ${reason ? `Reason: ${reason}` : ''}
      
      Please feel free to book another time that works for you.
      
      Powered by Schedulrr
    `,
  }),

  meetingReminder: ({ recipientName, eventTitle, hostName, startTime, meetLink, minutesBefore }) => ({
    subject: `Reminder: ${eventTitle} in ${minutesBefore} minutes`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">⏰ Meeting Reminder</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 18px;">Hi <strong>${recipientName}</strong>,</p>
            
            <p>Your meeting is starting in <strong>${minutesBefore} minutes</strong>!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h2 style="margin: 0 0 15px 0; color: #f59e0b;">${eventTitle}</h2>
              <p style="margin: 8px 0;"><strong>📅 Time:</strong> ${startTime}</p>
              <p style="margin: 8px 0;"><strong>👤 With:</strong> ${hostName}</p>
            </div>
            
            ${meetLink ? `
              <div style="text-align: center; margin: 30px 0;">
                <a href="${meetLink}" style="background: #f59e0b; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Join Meeting Now
                </a>
              </div>
            ` : ''}
          </div>
          
          <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
            <p>Powered by <strong>Schedulrr</strong></p>
          </div>
        </body>
      </html>
    `,
    text: `
      Meeting Reminder
      
      Hi ${recipientName},
      
      Your meeting is starting in ${minutesBefore} minutes!
      
      Event: ${eventTitle}
      Time: ${startTime}
      With: ${hostName}
      ${meetLink ? `Join: ${meetLink}` : ''}
      
      Powered by Schedulrr
    `,
  }),
};

// Send email function - supports multiple providers
export async function sendEmail({ to, template, data }) {
  // Check if email service is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    console.log("Email service not configured. Skipping email notification.");
    console.log("To enable emails, add RESEND_API_KEY to your environment variables.");
    return { success: false, message: "Email service not configured" };
  }

  try {
    const emailContent = emailTemplates[template](data);

    // Using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [to],
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to send email:", error);
      return { success: false, error };
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);
    return { success: true, id: result.id };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}
