type Props = {
  seed?: string;
  large?: boolean;
};

function Avatar({ seed, large }: Props) {
  // const { data: session } = useSession();
  return (
    <div
      className={`relative overflow-hidden border h-10 w-10 rounded-full border-gray-300 bg-white ${
        large && "h-20 w-20"
      } `}>
      <img src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`} />
    </div>
  );
}

export default Avatar;
