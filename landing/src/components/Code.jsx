const TOK = { k: 'code-tok-k', s: 'code-tok-s', f: 'code-tok-f', c: 'code-tok-c' };

/** Renders tokenised lines; `visible` limits how many lines are shown (typing effect). */
export default function Code({ lines, visible = lines.length, caret = false }) {
  return (
    <pre className="overflow-x-auto font-mono text-sm leading-7 text-fog sm:text-[0.95rem]">
      <code>
        {lines.map((line, i) => (
          <span
            key={i}
            className="block transition duration-500"
            style={{ opacity: i < visible ? 1 : 0, filter: i < visible ? 'none' : 'blur(6px)' }}
          >
            {line.map(([t, text], j) => (
              <span key={j} className={TOK[t]}>{text}</span>
            ))}
            {caret && i === visible - 1 && <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-sodium" />}
          </span>
        ))}
      </code>
    </pre>
  );
}
