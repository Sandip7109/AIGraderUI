
const Check = () => import("./check");
export function UploadedFiles() {
  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Check />
      </div>
    </>
  );
}

export default UploadedFiles;
