import { createAsync } from "@solidjs/router";
import { createMemo, createResource, For, Suspense } from "solid-js";

type Language = {
  name: string;
  static: boolean;
};

const getLanguages = async () => {
  "use server";

  console.log("zzz getting languages");

  await new Promise((res) => setTimeout(res, 3000));

  return [
    {
      name: "go",
      static: true,
    },
    {
      name: "python",
      static: false,
    },
    {
      name: "javascript",
      static: false,
    },
    {
      name: "C#",
      static: true,
    },
  ] satisfies Language[];
};

type Framework = {
  name: string;
  authoringFormat: "template" | "jsx";
};

const getFrameworks = async () => {
  await new Promise((res) => setTimeout(res, 5000));

  return [
    {
      name: "Angular",
      authoringFormat: "template",
    },
    {
      name: "SolidJS",
      authoringFormat: "jsx",
    },
    {
      name: "vue",
      authoringFormat: "template",
    },
    {
      name: "React",
      authoringFormat: "jsx",
    },
  ] satisfies Framework[];
};

function Frameworks() {
  const frameworks = createAsync(() => getFrameworks());

  return (
    <>
      <Suspense fallback={"Inner loading..."}>
        <For each={frameworks()}>
          {(framework) => (
            <div>
              {framework.name} {framework.authoringFormat}
            </div>
          )}
        </For>
      </Suspense>
    </>
  );
}

export default function Home() {
  const languages = createAsync(() => getLanguages());
  const numOfLangs = createMemo(() => {
    return languages()?.length;
  });

  return (
    <>
      <div>
        There are {numOfLangs()} languages
        <For each={languages()}>{(lang) => <div>{lang.name}</div>}</For>
      </div>
      <div>
        <Frameworks />
      </div>
    </>
  );
}
