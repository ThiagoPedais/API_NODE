interface MailCOnfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'contato@tp.com', // Email profissional
      name: 'Thiago Pedais'
    }
  }
} as MailCOnfig
