const API_URL = 'https://script.google.com/macros/s/AKfycbz91cEIr7CDb0jFr6GQL1JzIXQpAXck3FuFU5NPcZsx3fPSdtlvLucrqmq_0Bys7NWD/exec';

// 1. ฟังก์ชันส่งฟอร์ม (หน้า Index)
// ---------------------------------------------
async function submitContactForm(payload) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'submitForm',
                payload: payload
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return { status: 'error', message: 'การเชื่อมต่อเซิร์ฟเวอร์ขัดข้อง' };
    }
}

// ---------------------------------------------
// 2. ระบบ OTP และดึงข้อมูล (หน้า Login)
// ---------------------------------------------
async function requestOtp(email) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'sendOtp',
                email: email
            })
        });
        return await response.json();
    } catch (error) {
        return { status: 'error', message: 'ไม่สามารถส่งรหัส PIN ได้' };
    }
}

async function verifyAndFetch(email, otp) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'verifyOtp',
                email: email,
                otp: otp
            })
        });
        return await response.json();
    } catch (error) {
        return { status: 'error', message: 'ยืนยันตัวตนล้มเหลว' };
    }
}

// ---------------------------------------------
// 3. ระบบอัปโหลดไฟล์
// ---------------------------------------------
async function uploadFileToGas(ticketId, fileData, fileName, mimeType) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'uploadFile',
                ticketId: ticketId,
                fileData: fileData,
                fileName: fileName,
                mimeType: mimeType
            })
        });
        return await response.json();
    } catch (error) {
        return { status: 'error', message: 'อัปโหลดไฟล์ไม่สำเร็จ' };
    }
}
