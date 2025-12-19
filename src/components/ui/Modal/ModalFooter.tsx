export default function ModalFooter({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="mt-6 flex w-full justify-end gap-2">{children}</div>
}
