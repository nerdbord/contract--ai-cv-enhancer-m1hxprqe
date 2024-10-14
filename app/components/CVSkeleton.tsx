import { Skeleton } from "~/components/ui/skeleton";

export const CVSkeleton = () => {
  return (
    <div className="flex w-full max-w-[628px] gap-4 bg-slate-100 p-7">
      {/* PIERWSZA-KOLUMNA */}
      <div className="flex w-full max-w-56 flex-col gap-5">
        {/* Personal Information */}
        <Skeleton className="h-6" />

        <div className="flex flex-col gap-4">
          {/* Contact */}
          <section className="flex flex-col gap-2">
            <Skeleton className="h-4" />

            <ul className="flex flex-col gap-1">
              <Skeleton className="h-3" />
              <Skeleton className="h-3" />
            </ul>
          </section>

          {/* Portfolio */}
          <section className="flex flex-col gap-2">
            <Skeleton className="h-4" />

            <ul className="flex flex-col gap-1">
              <Skeleton className="h-3" />
              <Skeleton className="h-3" />
            </ul>
          </section>

          {/* Skills */}
          <section className="flex flex-col gap-2">
            <Skeleton className="h-4" />

            <ul className="flex flex-col gap-1">
              <Skeleton className="h-3" />
              <Skeleton className="h-3" />
              <Skeleton className="h-3" />
            </ul>
          </section>

          {/* Technologies */}
          <section className="flex flex-col gap-2">
            <Skeleton className="h-4" />

            <ul className="flex flex-col gap-1">
              <Skeleton className="h-3" />
              <Skeleton className="h-3" />
              <Skeleton className="h-3" />
            </ul>
          </section>

          {/* Certificates */}
          <section className="flex flex-col gap-2">
            <Skeleton className="h-4" />

            <ul className="flex flex-col gap-1">
              <Skeleton className="h-3" />
              <Skeleton className="h-3" />
              <Skeleton className="h-3" />
            </ul>
          </section>

          {/* Clause */}
          <section className="flex flex-col gap-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-11" />
          </section>
        </div>
      </div>

      {/* DRUGA-KOLUMNA */}
      <div className="flex w-full max-w-[342px] flex-col gap-5">
        <Skeleton className="h-6" />

        <div className="flex flex-col gap-6">
          {/* Summary */}
          <section className="flex flex-col gap-2">
            <Skeleton className="h-5" />
            <Skeleton className="h-11" />
          </section>

          {/* Experience */}
          <section className="flex flex-col gap-4">
            <Skeleton className="mb-2 h-5" />

            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 basis-2/3" />
                <Skeleton className="h-4 basis-1/3" />
              </div>
              <Skeleton className="h-11" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 basis-2/3" />
                <Skeleton className="h-4 basis-1/3" />
              </div>
              <Skeleton className="h-11" />
            </div>
          </section>

          {/* Education */}
          <section className="flex flex-col gap-2">
            <Skeleton className="mb-2 h-5" />

            <div className="flex flex-col gap-1">
              <Skeleton className="h-3" />

              <div className="flex items-center justify-between">
                <Skeleton className="h-5 basis-2/3" />
                <Skeleton className="h-5 basis-1/3" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
