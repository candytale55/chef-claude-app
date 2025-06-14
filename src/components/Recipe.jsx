import ReactMarkdown from 'react-markdown';

export default function Recipe({recipe}) {

  return (
    <section>
      <h2>Chef Claude Recommends:</h2>
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </section>
  );
}