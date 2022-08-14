import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IForm {
  title: string;
  link: string;
  referer: string;
  userAgent: string;
}

const Home: NextPage = () => {
  const { register, handleSubmit, resetField } = useForm<IForm>();
  const onSubmit = async ({ link, referer, title, userAgent }: IForm) => {
    if (typeof window !== undefined) {
      try {
        const result = `ffmpeg -user_agent "${userAgent}" -headers "referer: ${referer}" -i "${link}" -c copy "${title}.mp4"`;
        await window.navigator.clipboard.writeText(result);
        resetField("link");
        resetField("title");
        toast("copy!", { position: "bottom-right" });
      } catch (error) {
        toast(error as string, { position: "bottom-right" });
      }
    }
  };
  return (
    <div>
      <main className="w-full min-h-screen flex justify-center items-center">
        <section className={"max-w-screen-md w-full px-5"}>
          <form
            className="w-full p-5 bg-zinc-100 shadow-md flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              required
              className="w-full p-3 bg-white rounded-md outline-none "
              type={"text"}
              placeholder={"Link"}
              {...register("link", { required: true })}
            />
            <input
              required
              className="w-full p-3 bg-white rounded-md outline-none "
              type={"text"}
              placeholder={"Title"}
              {...register("title", { required: true })}
            />
            <input
              required
              className="w-full p-3 bg-white rounded-md outline-none "
              type={"text"}
              placeholder={"Referer"}
              {...register("referer", { required: true })}
            />
            <input
              required
              className="w-full p-3 bg-white rounded-md outline-none "
              type={"text"}
              placeholder={"User Agent"}
              {...register("userAgent", { required: true })}
            />
            <button
              className="w-full p-3 px-5 bg-blue-500 text-white shadow-md rounded-md"
              type="submit"
            >
              Create Link
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Home;
