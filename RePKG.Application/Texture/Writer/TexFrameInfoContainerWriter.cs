using System;
using System.IO;
using RePKG.Application.Exceptions;
using RePKG.Core.Texture;

namespace RePKG.Application.Texture
{
    public class TexFrameInfoContainerWriter : ITexFrameInfoContainerWriter
    {
        public void WriteTo(BinaryWriter writer, ITexFrameInfoContainer frameInfoContainer)
        {
            if (writer == null) throw new ArgumentNullException(nameof(writer));
            if (frameInfoContainer == null) throw new ArgumentNullException(nameof(frameInfoContainer));

            writer.WriteNString(frameInfoContainer.Magic);
            writer.Write(frameInfoContainer.Frames.Count);

            switch (frameInfoContainer.Magic)
            {
                case "TEXS0002":
                    WriteV2(frameInfoContainer, writer);
                    break;

                case "TEXS0003":
                    WriteV3(frameInfoContainer, writer);
                    break;

                default:
                    throw new UnknownMagicException(nameof(TexFrameInfoContainerWriter), frameInfoContainer.Magic);
            }
        }

        private static void WriteV2(ITexFrameInfoContainer container, BinaryWriter writer)
        {
            WriteFrames(container, writer);
        }

        private static void WriteV3(ITexFrameInfoContainer container, BinaryWriter writer)
        {
            writer.Write(container.GifWidth);
            writer.Write(container.GifHeight);

            WriteFrames(container, writer);
        }

        private static void WriteFrames(ITexFrameInfoContainer container, BinaryWriter writer)
        {
            foreach (var frame in container.Frames)
            {
                writer.Write(frame.ImageId);
                writer.Write(frame.Frametime);
                writer.Write(frame.X);
                writer.Write(frame.Y);
                writer.Write(frame.Width);
                writer.Write(frame.Unk0);
                writer.Write(frame.Unk1);
                writer.Write(frame.Height);
            }
        }
    }
}