from psd_tools import PSDImage

psd = PSDImage.open('./1.psd')
psd.composite().save('./example1.png')

for layer in psd:
    print(layer)
    layer_image = layer.composite()
    layer_image.save('%s.png' % layer.name)