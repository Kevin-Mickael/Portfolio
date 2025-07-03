'use client';
import { Column, Flex, Heading, Input, Textarea, Button, Text } from "@once-ui-system/core";
import { useState, ChangeEvent, FormEvent } from "react";
import { gallery } from "@/resources";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.message) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    // Ici, tu pourrais envoyer le formulaire à un backend ou service externe
    setSent(true);
  };

  return (
    <Flex as="section" fill center paddingY="80">
      <Column maxWidth="s" fillWidth gap="32" padding="32" background="surface" border="neutral-alpha-weak" radius="l" shadow="l">
        <Heading as="h1" variant="display-strong-m" align="center">{gallery.title}</Heading>
        {sent ? (
          <Text align="center" color="success">Merci pour votre message !</Text>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Column gap="20">
              <Input
                id="contact-name"
                name="name"
                label="Nom"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                id="contact-email"
                name="email"
                label="Email"
                type="email"
                placeholder="Votre email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Textarea
                id="contact-message"
                name="message"
                label="Message"
                placeholder="Votre message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
              />
              {error && <Text color="danger" align="center">{error}</Text>}
              <Button type="submit" variant="primary" fillWidth>Envoyer</Button>
            </Column>
          </form>
        )}
      </Column>
    </Flex>
  );
}
