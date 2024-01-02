import { Resend } from 'resend';
import AdminResponse from '@/emails/AdminResponse';
import { NextResponse } from 'next/server';

const resend = new Resend(`${process.env.RESEND_API_KEY}`)


const fullName = 'Test';
const tourDate = new Date('12/24/2023');
const pickupInfo = 'Pickup info';
const packageName = 'Malapascua';
const packageUrl = 'https://url.com';
const headline = 'Your Booking is Confirmed';
const remarks = 'We look forward to providing you with a memorable and enjoyable experience. If there are any changes or updates to your booking, we will keep you informed. Thank you once again for choosing Virgorus. We can\'t wait to welcome you on board!';

export async function POST() {

    //Should parse post body here to retrieve info

    //Test only data
    const emailContent = AdminResponse({
        fullName,
        tourDate,
        pickupInfo,
        packageName,
        packageUrl,
        headline,
        remarks,
    });

    // Send the email
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['dev.virgorus@gmail.com'],
            subject: 'Your booking is confirmed',
            react: emailContent,
        });
        return NextResponse.json({ message: data }, { status: 200 })
    } catch (error) {
        
    }
}