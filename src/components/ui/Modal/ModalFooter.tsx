interface ModalFooterProps {
  children: React.ReactNode
}

function ModalFooter({ children }: ModalFooterProps) {
  return <footer className="mt-6 flex justify-end gap-2">{children}</footer>
}

export default ModalFooter
