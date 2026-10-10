export const createInvoice = async (a: number, c='PKR') => ({ ok: true, invoiceId: Date.now().toString(), amount: a, currency: c });
